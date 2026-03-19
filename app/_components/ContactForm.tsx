"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { sendContactMessage } from "../actions/contact";

// Import your Better Auth client (adjust path as needed)
// import { authClient } from "@/lib/auth-client"; 

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Optional: Get session from Better Auth
  // const { data: session } = authClient.useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", // session?.user.name || ""
      email: "", // session?.user.email || ""
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError(null);

    const result = await sendContactMessage(data);

    if (result?.success) {
      setIsSuccess(true);
      reset();
    } else {
      setServerError(result?.error || "Failed to send message.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input
                  {...register("name")}
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">How can we help?</label>
              <textarea
                {...register("message")}
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 resize-none ${
                  errors.message ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-blue-500 focus:ring-blue-50"
                }`}
                placeholder="Tell us about your project..."
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            {serverError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Message Sent!</h2>
            <p className="text-slate-600 mt-2 max-w-xs">
              Thanks for reaching out. Our team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}