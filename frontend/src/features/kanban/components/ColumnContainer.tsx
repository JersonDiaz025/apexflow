export default function ColumnContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[330px] min-w-[290px] md:w-[350px] md:min-w-[340px] flex flex-col max-h-full flex-shrink-0 animate-fade-in">
            {children}
        </div>
    );
}
