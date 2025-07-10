import React from "react";
import {Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        } from "../ui/dialog";
import { Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage, 
        } from "../ui/form";
import { Input } from "../ui/input"

import { z } from "zod/v4"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProjectSwitcher from "../ProjectSwitcher/ProjectSwitcher";
import { AddProjectFormProps } from "@/utils/types";
import { Button } from "../ui/button";

const projectFormSchema = z.object({
    name: z.string().min(1, "Project Name is required"),
    subtitle: z.string().optional(),
    img: z.file().mime(["image/png", "image/jpeg"], "Only images can be used").optional(),
})

const AddProjectForm: React.FC<AddProjectFormProps> = ({projectList, selectedProjectId, handleProjectSelect}) => {

    const form = useForm<z.infer<typeof projectFormSchema>>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            name: "",
            subtitle: "",
        }
    })

    function onSubmit(values: z.infer<typeof projectFormSchema>) {
        //Send request to backend to create new project
        console.log("Form Submited")
        console.log(values);
    }

    return (
        <Dialog>
            <ProjectSwitcher  
            projectList={projectList}
            selectedProjectId={selectedProjectId}
            handleProjectSelect={handleProjectSelect} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>Fill out fields to create a new project. They can be changed later. Fields marked with an astrix are required.</DialogDescription>
                </DialogHeader>
                
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Subtitle</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Subtitle" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField
                        control={form.control}
                        name="img"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Image</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="file"
                                        accept="image/png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(file);
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add Project</Button>
                        </DialogFooter>
            </DialogContent>
            </form>
            </Form>

        </Dialog>
    )

}

export default AddProjectForm;