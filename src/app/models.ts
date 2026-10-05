export interface Student {
  id: number;
  studentName: string;
  className: string;
  mobileNumber: string;
  pickupPlace: string;
  joiningDate: string;
  monthlyFee: number;
  active: boolean;
}

export interface Payment {
  id: number;
  studentId: number;
  month: string;
  amount: number;
  paymentDate: string;
  status: "PAID" | "PARTIAL";
}
