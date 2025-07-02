export default function BoardImage({imageURL, altText, handleImageSelect}) {
    return (
        <>
        <img className="h-40" src={imageURL} alt={altText} onClick={() => handleImageSelect(imageURL)}/>
        </>
    )
}