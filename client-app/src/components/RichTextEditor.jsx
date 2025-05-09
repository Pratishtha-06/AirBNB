import React, { useEffect } from "react";
import {useEditor ,EditorContent} from '@tiptap/react';
import {StarterKit} from '@tiptap/starter-kit';



function RichTextEditor({content,setContent}){
    const editor=useEditor({
        extensions:[StarterKit],
        content,
        onUpdate :({editor})=>{
            setContent(editor.getHTML())
        }
    })

    useEffect(()=>{
        if(editor && content !== editor.getHTML()){
            editor.commands.setContent(content)
        }
    },[content,content])
   
    if(!editor) return null;

    const setHeading = (level) => {
        editor.chain().focus().toggleHeading({ level }).run();
        return;
      };
    const setItalic = () => {
        editor.chain().focus().toggleItalic().run();
        return;
      };  
    const setBold = () => {
        editor.chain().focus().toggleBold().run();
        return;
      };  
    
      return (
        <>
        <div className="w-100 " style={{border:'1px solid black' ,borderRadius:'5px'}}>
        <div className="text-controls m-1" style={{borderBottom:'1px solid black'}}>
            <button type="button" className="mx-1 styles" onClick={() => setHeading(1)}>H1</button>
            <button type="button" className="mx-1 styles" onClick={() => setHeading(2)}>H2</button>
            <button type="button" className="mx-1 styles" onClick={() => setHeading(3)}>H3</button>
            <button type="button" className="mx-1 styles" onClick={() => setHeading(4)}>H4</button>
            <button type="button" className="mx-1 styles" onClick={() => setHeading(5)}>H5</button>
            <button type="button" className="mx-1 styles" onClick={() => setHeading(6)}>H6</button>
            <button type="button" 
                    className={`mx-1 styles ${editor.isActive('italic') ? 'active' : ''}`} 
                    onClick={() => setItalic()}>I</button>
            <button type="button" 
                    className={`mx-1 styles ${editor.isActive('bold') ? 'active' : ''}`} 
                    onClick={() => setBold()}>B</button>
        </div>
            <EditorContent editor={editor} style={{marginTop:'10px',paddingLeft:'10px'}}/>
        </div>
        
        </>
    )
}

export default RichTextEditor;