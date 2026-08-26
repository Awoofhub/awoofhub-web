import ReportService from "@/services/report-service";
import { CreateReportData, Report } from "@/types/report";
import { useMutation } from "@tanstack/react-query";


export const report = async (data: CreateReportData): Promise<Report> => {
  const result = await ReportService.createReport(data);
  return result.data;
};

type UseReportOptions = {
  onSuccess?: (report: Report) => void;
};

export const useReport = ({ onSuccess }: UseReportOptions = {}) => {
  const { mutate: submit, isPending, reset } = useMutation({
    mutationFn: report,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
});

return {
  submit,
  isPending,
  reset
};
};