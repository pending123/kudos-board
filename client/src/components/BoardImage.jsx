export default function BoardImage({imageURL, altText, handleImageSelect}) {
    return (
        <>
        <img className="h-50" src={imageURL} alt={altText} onClick={() => handleImageSelect(imageURL)}/>
        </>
    )
}