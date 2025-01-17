import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import { FILE } from "@/app/dashboard/_components/FileList";
//@ts-ignore
import CheckList from "@editorjs/checklist";
//@ts-ignore
import Embed from '@editorjs/embed';
import Error from 'next/error';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';

const rawDocument = {
    time: 1550476186479,
    blocks: [
        {
            type: 'header',
            data: {
                text: 'Click here and write',
                level: 2,
            },
            id: "123",
        },
        {
            type: 'header',
            data: {
                text: 'Another header block',
                level: 4,
            },
            id: "1234",
        },
    ],
    version: "2.8.1",
};

function Editor({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: FILE }) {
    const ref = useRef<any>(null);
    const updateDocument = useMutation(api.functions.files.updateDocument);
    const [document, setDocument] = useState();

    useEffect(() => {
        if (fileData) { // Wait until fileData is defined
            initEditor();
        }
        return () => {
            if (ref.current && typeof ref.current.destroy === 'function') {
                ref.current.destroy();
            }
            ref.current = null;
        };
    }, [fileData]);

    useEffect(() => {
        if (onSaveTrigger) {
            onSaveDocument();
        }
    }, [onSaveTrigger]);

    const onSaveDocument = () => {
        if (ref.current) {
            ref.current.save()
                .then((outputData: any) => {
                    console.log('Article data: ', outputData);
                    updateDocument({
                        _id: fileId,
                        document: JSON.stringify(outputData)
                    })
                        .then(resp => {
                            toast('Document Updated!');
                        })
                        .catch((e) => {
                            toast('Server Error!');
                        });
                })
                .catch((error: Error) => {
                    console.log('Saving failed: ', error);
                });
        }
    };

    const initEditor = async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const editor = new EditorJS({
            tools: {
                header: {
                    //@ts-ignore
                    class: Header,
                    inlineToolbar: true,
                },
                list: {
                    //@ts-ignore
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered',
                    },
                },
                checkList: {
                    class: CheckList,
                    inlineToolbar: true,
                },
                quote: {
                    //@ts-ignore
                    class: Quote,
                    inlineToolbar: true,
                },
                embed: Embed,
            },
            holder: 'editorjs',
            data: fileData && fileData.document.length? JSON.parse(fileData.document) : rawDocument
        });
        ref.current = editor;
    };

    return (
        <div>
            <div id='editorjs'></div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false });
