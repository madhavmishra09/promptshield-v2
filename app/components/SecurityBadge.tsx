'use client';
export default function SecurityBadge(){
    return(
        <>
            <div className="font-extrabold text-3xl border-2 rounded-4xl w-[200px] h-[50px] mb-6 flex justify-center items-center p-2 ">
                <p>SAFE</p>
            </div>
            <div className="font-extrabold text-3xl border-2 rounded-4xl w-[200px] h-[50px] mb-6 flex justify-center items-center p-2 ">
                <p>BLOCKED</p>
            </div>
            <div className="font-extrabold text-3xl border-2 rounded-4xl w-[200px] h-[50px] mb-6 flex justify-center items-center p-2 ">
                <p>WARNING</p>
            </div>
        </>
    )
};