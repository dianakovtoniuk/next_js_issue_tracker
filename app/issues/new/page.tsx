'use client'
import {Button, TextField, Callout} from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import 'easymde/dist/easymde.min.css'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/validationSchemas";
import Spinner from "@/app/components/spinner";

interface IIsueForm {
    title: string;
    description: string;
}


function NewIssuePage() {

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter();

    const { register, control, handleSubmit } = useForm<IIsueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setIsSubmitting(false);
            console.error(error);
            setError('Unexpected error');
        }
    });

  return (
    <div className="max-w-xl">
        { error && <Callout.Root color="red"><Callout.Text>{error}</Callout.Text></Callout.Root>}

        <form className="space-y-3" onSubmit={onSubmit}>
            <TextField.Root placeholder="Title" {...register('title')} />

            <Controller name="description" control={control} render={({ field }) => <SimpleMde placeholder="Description" {...field} />} />

            <Button>Submit
                {isSubmitting && <Spinner />}
            </Button>
        </form>
    </div>
  )
}

export default NewIssuePage