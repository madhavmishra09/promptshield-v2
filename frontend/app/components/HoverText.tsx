type TextHoverProps={
    children: string;
};

export default function HoverText({children}: TextHoverProps){
    return(
        <>
            {children.split(" ").map((word,index)=>(
                <span key={index} className="inline-block mx-1 transition duration-300 hover:scale-110">
                        {word}
                </span>
            ))}
        </>
    );
}