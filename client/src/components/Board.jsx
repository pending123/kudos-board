export default function Board({boardId, title, category, author, image}) {    
    
    return (
        <div className="flex flex-col items-center border border-black pb-4">
            <img src="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4" />
            <h1 className="text-4xl mt-3">{title}</h1> 
            <p className="text-2xl">{category}</p>
            <div className="flex justify-around w-full mt-3">
                <button className="text-2xl border border-black p-1.5 cursor-pointer">View Board</button>
                <button className="text-2xl border border-black p-1.5 cursor-pointer">Delete Board</button>
            </div>
        </div>
    )
}