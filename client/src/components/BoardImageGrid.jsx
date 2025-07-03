import BoardImage from "./BoardImage"

export default function BoardImageGrid({images, handleImageSelect}) 
{
    return (
        <>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 p-1 m-6">
        {images.map((image) => (
            <BoardImage 
                handleImageSelect={handleImageSelect}
                key={image.id}
                imageURL={image.urls.regular}
                altText={image.description || "Unsplash photo"}
            /> 
        ))}
        </div>
        </>
    );
}