'use client'
import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import 'easymde/dist/easymde.min.css'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/validationSchemas";
import Spinner from "@/app/components/spinner";
import ErrorMessage from "@/app/components/errorMessage";
import { Issue } from "@prisma/client";
import { z } from "zod";

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
    issue?: Issue;
}

function IssueForm({ issue }: Props) {

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: issue?.title,
            description: issue?.description
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data);
            } else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
            setError('Unexpected error occurred.');
        }
    });

  return (
    <div className="max-w-xl">
        { error && <Callout.Root color="red" className="mb-5"><Callout.Text>{error}</Callout.Text></Callout.Root>}

        <form className="space-y-3" onSubmit={onSubmit}>
            <TextField.Root placeholder="Title" {...register('title')} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMde placeholder="Description" {...field} />}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Button disabled={isSubmitting}>
                {issue ? 'Update Issue' : 'Submit New Issue'}
                {isSubmitting && <Spinner />}
            </Button>
        </form>
    </div>
  )
}

export default IssueForm
