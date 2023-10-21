import { cn } from "@/lib/utils";
import { File, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "../others/ProgressBar";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

export const UploadDropZone = () => {
  const router = useRouter();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const { startUpload } = useUploadThing("docUploader");
  const { toast } = useToast();
  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) setUploadFile(acceptedFiles[0]);
    if (acceptedFiles[0].type !== "application/pdf") {
      setUploadFile(null);
      return toast({
        title: "AIDe loves PDF",
        description: "Sorry, currently only PDF files are allowed.",
        variant: "destructive",
      });
    }
    if (acceptedFiles[0].size > 4194304) {
      setUploadFile(null);
      return toast({
        title: "Oh, it's too large",
        description: "Only files up to 4MB are accepted.",
        variant: "destructive",
      });
    }
    const res = await startUpload(acceptedFiles);
    if (!res) {
      setUploadFile(null);
      return toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    const [fileResponse] = res;
    const key = fileResponse?.key;
    if (!key) {
      setUploadFile(null);
      return toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setUploadCompleted(true);
    startPolling({ key });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className="relative border h-64 m-4 border-dashed rounded-lg">
      <div className="flex-centered h-full w-full" {...getRootProps()}>
        <label
          className={cn([
            "flex-centered flex-col w-full h-full rounded-lg cursor-pointer  from-primary/80 to-accent/100 ",
            isDragActive
              ? "bg-gradient-to-br text-white"
              : " bg-accent/10 text-text",
            uploadFile
              ? "pointer-events-none"
              : "hover:bg-gradient-to-br hover:text-white",
          ])}
        >
          <input
            {...getInputProps()}
            type="file"
            accept="application/pdf"
            disabled={!!uploadFile}
          />
          <div className="flex-centered flex-col py-lg text-center">
            {uploadFile ? (
              <Loader2 className="animate-spin w-lg h-lg mb-md text-primary/100" />
            ) : (
              <Upload className="w-lg h-lg mb-md text-primary/100" />
            )}
            <p>
              {!uploadCompleted ? (
                <>
                  <strong>Drag & Drop</strong> OR <strong>Click</strong> to
                  Upload
                  <br />
                  (size limit: up to 4MB)
                </>
              ) : (
                <>
                  File Upload Successful!
                  <br />
                  Redirecting Now ...
                </>
              )}
            </p>
          </div>
          {uploadFile && (
            <>
              <div className="text-text max-w-xs bg-primary-foreground flex-centered rounded-md overflow-hidden outline outline-primary/5 divide-x">
                <div className="p-sm h-full grid place-items-center">
                  <File className="w-md h-md text-accent/100" />
                </div>
                <div className="p-sm h-full text-sm truncate">
                  {uploadFile.name}
                </div>
              </div>

              <ProgressBar
                className="h-1 w-full bg-slate-300 absolute bottom-0"
                completed={uploadCompleted}
              />
            </>
          )}
        </label>
      </div>
    </div>
  );
};