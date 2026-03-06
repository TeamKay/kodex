"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseCategories, courseLevels, courseSchema, CourseSchemaType, courseStatus } from "@/lib/zodSchemas";
import { ArrowLeft, Loader2, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { CreateCourse } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CourseCreationPage(){
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const {triggerConfetti} = useConfetti();

    const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema) as Resolver<CourseSchemaType>,
        defaultValues: {
            title: "",
            description: "",
            fileKey: "",
            price: 0,
            duration: 0,
            level: "Beginner",
            category: "Teaching & Academics",
            status: "Draft",
            slug: "",
            smallDescription: "",
        },
    });

    
    function onSubmit(values: CourseSchemaType){
        startTransition(async()=>{
            const {data: result, error} = await tryCatch(CreateCourse(values));

            if (error) {
                toast.error("An unexpected error occurred.");
                return;
            }

            if(result.status === 'success'){
                toast.success(result.message);
                triggerConfetti();
                form.reset();
                router.push('/dashboard/admin/courses');
            } else if(result.status === 'error'){
                toast.error(result.message);
            }
        });
    }

    
    return (
        <>
        <div className="flex items-center gap-4">
            <Link href="/dashboard/admin/courses" className={buttonVariants({
                variant: "outline",
                size: "icon"
            })}>
                <ArrowLeft className="size-4" />
                
            </Link>
            <h1 className="text-2xl font-bold">Create Courses</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>
                    Provide Basic Information about the Course
                </CardTitle>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form 
                       className="space-y-6"
                       onSubmit={form.handleSubmit(onSubmit)}>

                         <div className="flex gap-4 items-end">
                    
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="Title"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e); // keep react-hook-form change handling
                                        const slug = slugify(e.target.value, { lower: true });
                                        form.setValue("slug", slug, { shouldValidate: true });
                                    }}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        
                            <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="Slug" {...field} readOnly />
                                </FormControl>
                                </FormItem>
                            )}
                            />


                            </div>

                            <FormField
                            control={form.control}
                            name="smallDescription"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Small Description</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                           placeholder="Small Description" 
                                           className="min-h-30" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="description"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <RichTextEditor field={field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="fileKey"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Thumbnail image</FormLabel>
                                    <FormControl>
                                         <Uploader fileTypeAccepted="image" onChange={field.onChange} value={field.value} /> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            /> 

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                            control={form.control}
                            name="category"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Category</FormLabel>
                                    <Select 
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Category"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courseCategories.map((category)=>(
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="level"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Level</FormLabel>
                                    <Select 
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Value"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courseLevels.map((category)=>(
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="duration"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Duration (hours)</FormLabel>
                                    <FormControl>
                                        <Input 
                                           placeholder="Duration" 
                                           type="number" 
                                           {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            

                            <FormField
                            control={form.control}
                            name="price"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input 
                                           placeholder="Price" 
                                           type="number" 
                                           {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            </div>

                        <FormField
                            control={form.control}
                            name="status"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Status</FormLabel>
                                    <Select 
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Status"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courseStatus.map((category)=>(
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" disabled={pending}>
                                {pending ? (
                                    <>
                                    Creating...
                                    
                                    <Loader2 className="animate-spin ml-1"/>
                                    </>
                                ):(
                                    <>
                                    Create Course <PlusIcon className="ml-1" size={16}/>
                                    </>
                                )}
                            </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </>
    )
}

