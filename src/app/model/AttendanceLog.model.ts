export interface AttendanceLogModel{
    userId: number;
    inOutTime: string;
    checkType: string;
    total: number;
    present: number;
    wfh:number;
    absent: number;
    startDate: string;
    endDate: string;
}