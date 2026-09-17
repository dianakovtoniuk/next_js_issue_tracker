'use client'
import {Button, TextField} from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css'


function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
        <TextField.Root placeholder="Title" />
        <SimpleMde placeholder="Deacription" />

        <Button>Submit</Button>
    </div>
  )
}

export default NewIssuePage