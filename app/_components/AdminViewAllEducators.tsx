'use client';

import { useState, useMemo } from "react";
import { EmptyState } from "@/app/_components/general/EmptyState";
import { ChevronUp, ChevronDown, ArrowUpDown, Search } from "lucide-react";

// Types
interface Course {
    id: string;
    status: "Published" | "Draft" | "Pending";
    user: { id: string; name: string | null } | null;
    _count: { enrolledStudents: number };
}

interface EducatorGroup {
    id: string;
    name: string;
    publishedCount: number;
    draftCount: number;
    pendingCount: number;
    totalStudents: number;
}

type SortConfig = {
    key: keyof EducatorGroup;
    direction: 'asc' | 'desc';
} | null;

interface AdminViewAllEducatorsProps {
    rawData: Course[];
}

export default function AdminViewAllEducators({ rawData }: AdminViewAllEducatorsProps) {
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const educatorGroups = useMemo(() => {
        if (!rawData) return [];

        // 1. Group the data
        const grouped = rawData.reduce<Record<string, EducatorGroup>>((acc, course) => {
            const educatorId = course.user?.id || "unknown";
            const educatorName = course.user?.name || "Unknown Educator";

            if (!acc[educatorId]) {
                acc[educatorId] = {
                    id: educatorId,
                    name: educatorName,
                    publishedCount: 0,
                    draftCount: 0,
                    pendingCount: 0,
                    totalStudents: 0,
                };
            }

            if (course.status === "Published") acc[educatorId].publishedCount++;
            else if (course.status === "Draft") acc[educatorId].draftCount++;
            else if (course.status === "Pending") acc[educatorId].pendingCount++;
            
            acc[educatorId].totalStudents += course._count?.enrolledStudents || 0;
            return acc;
        }, {});

        let result = Object.values(grouped);

        // 2. Filter by search term
        if (searchTerm.trim() !== "") {
            result = result.filter(educator => 
                educator.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 3. Sort the results
        if (sortConfig !== null) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [rawData, sortConfig, searchTerm]);

    const requestSort = (key: keyof EducatorGroup) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (rawData.length === 0) {
        return (
            <div className="py-20">
                <EmptyState title="No courses found" description="No educators have created courses yet." buttonText="Create Course" href="/dashboard/educator/courses/create" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-0 py-0">
            {/* Header section with Search Bar replacing Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search educator by name..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                        <tr>
                            <SortableHeader label="Educator Name" sortKey="name" config={sortConfig} onSort={requestSort} align="left" />
                            <SortableHeader label="Published" sortKey="publishedCount" config={sortConfig} onSort={requestSort} />
                            <SortableHeader label="Pending" sortKey="pendingCount" config={sortConfig} onSort={requestSort} />
                            <SortableHeader label="Drafts" sortKey="draftCount" config={sortConfig} onSort={requestSort} />
                            <SortableHeader label="Total Students" sortKey="totalStudents" config={sortConfig} onSort={requestSort} />
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {educatorGroups.length > 0 ? (
                            educatorGroups.map((educator) => (
                                <tr key={educator.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-foreground">{educator.name}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <Badge count={educator.publishedCount} color="bg-green-100 text-green-700" />
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <Badge count={educator.pendingCount} color="bg-blue-100 text-blue-700" />
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <Badge count={educator.draftCount} color="bg-amber-100 text-amber-700" />
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-muted-foreground font-medium">{educator.totalStudents.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <button className="text-primary hover:underline text-sm font-medium">View Courses</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                                    No educators found matching &quot;{searchTerm}&quot;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Sub-components remain the same...
interface SortableHeaderProps {
    label: string;
    sortKey: keyof EducatorGroup;
    config: SortConfig;
    onSort: (key: keyof EducatorGroup) => void;
    align?: "left" | "center" | "right";
}

function SortableHeader({ label, sortKey, config, onSort, align = "center" }: SortableHeaderProps) {
    const isActive = config?.key === sortKey;
    const alignmentClass = align === 'left' ? 'text-left' : align === 'center' ? 'text-center' : 'text-right';
    const flexClass = align === 'center' ? 'justify-center' : 'justify-start';

    return (
        <th 
            className={`px-6 py-4 ${alignmentClass} text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors`}
            onClick={() => onSort(sortKey)}
        >
            <div className={`flex items-center ${flexClass} gap-1`}>
                {label}
                {isActive ? (
                    config.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                ) : <ArrowUpDown size={12} className="opacity-30" />}
            </div>
        </th>
    );
}

function Badge({ count, color }: { count: number, color: string }) {
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${color}`}>{count}</span>;
}

