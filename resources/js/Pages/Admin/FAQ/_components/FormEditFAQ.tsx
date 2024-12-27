import { Button } from "@/Components/ui/button";
import { RotateCcw } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Components/ui/textarea";
import { useErrorNotifier } from "@/lib/useErrorNotifier";
import { DataFAQSchema } from "@/types/FAQType";

const FormEditFAQ = ({
  dataFAQ,
  errorMessage,
}: {
  dataFAQ: DataFAQSchema;
  errorMessage?: string;
}) => {
  const { data, setData, patch, processing, errors, reset } = useForm({
    question: dataFAQ.question,
    answer: dataFAQ.answer,
  });

  const { resetErrorCount } = useErrorNotifier("Gagal Edit FAQ", errorMessage);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("faq.edit.request", { id: dataFAQ.id }), {
      onError: (errors) => {
        console.log("Error:", errors);
      },
      onFinish: () => {
        resetErrorCount();
      },
    });
  };

  return (
    <>
      <div className="mt-1 w-full">
        <form className="flex w-full flex-col gap-1" onSubmit={onSubmit}>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="question">Pertanyaan</Label>
              <Textarea
                id="question"
                value={data.question}
                onChange={(e) => setData("question", e.target.value)}
                placeholder="pertanyaan yang sering ditanyakan"
                disabled={processing}
              />
              <InputError message={errors.question} className="mt-2" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-2 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="answer">Jawaban</Label>
              <Textarea
                id="answer"
                value={data.answer}
                onChange={(e) => setData("answer", e.target.value)}
                placeholder="jawaban"
                disabled={processing}
              />
              <InputError message={errors.answer} className="mt-2" />
            </div>
          </div>
          <div className="mt-4 flex w-full justify-end gap-4">
            <button
              disabled={processing}
              onClick={() => reset()}
              type="reset"
              className="group flex items-center justify-center"
            >
              <RotateCcw
                size={20}
                className="mr-2 transition-all duration-300 group-hover:-rotate-[320deg]"
              />
              Reset
            </button>
            <Button disabled={processing} type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormEditFAQ;
