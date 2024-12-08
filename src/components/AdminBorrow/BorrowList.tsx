import { BorrowService } from "@/services/BorrowService";
import { Borrow, BORROW_STATUS } from "@/types/borrow";
import React from "react";

interface BorrowListProps {
  borrows: Borrow[];
  onActionComplete: () => void;
}

type ButtonActionProps = {
  id: number | null;
  status: number;
  onActionComplete: () => void;
};

const handleApprove = async (id: number | null, onActionComplete: () => void) => {
    try {
        await BorrowService.approve(id);
        onActionComplete()
      } catch (error: any) {
        console.error(error)
      }
}

const handleReturn = async (id: number | null, onActionComplete: () => void) => {
    try {
        await BorrowService.return(id);
        onActionComplete()
      } catch (error: any) {
        console.error(error)
      }
}

function ButtonAction({ status, id , onActionComplete}: ButtonActionProps) {
  if (status == BORROW_STATUS["PENDING"]) {
    return (
      <button
        className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
        onClick={() => handleApprove(id, onActionComplete)}
      >
        Approve
      </button>
    );
  } else if (status == BORROW_STATUS["APPROVED"]) {
    return <button
            className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            onClick={() => handleReturn(id, onActionComplete)}>
            Return
        </button>
  }
}
export const BorrowList: React.FC<BorrowListProps> = ({ borrows, onActionComplete }) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">#</th>
            <th className="p-3 text-left border">Book Name</th>
            <th className="p-3 text-left border">User Name</th>
            <th className="p-3 text-left border">Duration</th>
            <th className="p-3 text-left border">Date</th>
            <th className="p-3 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow, index) => (
            <tr key={borrow.id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{borrow.book_title}</td>
              <td className="p-3 border">{borrow.user_name}</td>
              <td className="p-3 border">{borrow.day}</td>
              <td className="p-3 border">
                {(borrow.start_date ? new Date(borrow.start_date).toLocaleDateString() : '') + " - " + 
                (borrow.end_date ? new Date(borrow.end_date).toLocaleDateString() : '')}
              </td>
              <td className="p-3 border">
                <ButtonAction status={borrow.status} id={borrow.id ?? null} onActionComplete={onActionComplete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
