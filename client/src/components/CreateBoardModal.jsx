
export default function CreateBoardModal({handleClose}) {
    return (
        <div className="fixed inset-0 bg-black/15 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-130">
                <button className="text-4xl mb-4 text-center cursor-pointer" onClick={handleClose}>&times;</button>
                <h1 className="text-3xl font-bold mb-8">Create a New Board</h1>
                <form className="flex flex-col gap-4">
                    <label className="text-2xl">Title</label>
                    <input type="text" className="border border-black-300 text-1xl p-1 rounded-xl"></input>
                    <label className="text-2xl">Category</label>
                    <select className="text-1xl border border-black-300 p-1 rounded-xl">
                        <option className="selected">Select a category</option>
                        <option>Celebration</option>
                        <option>Gratitude</option>
                        <option>Inspiration</option>
                    </select>
                    <label className="text-2xl">Author</label>
                    <input type="text" className="border border-black-300 text-1xl p-1 rounded-xl"></input>
                    <button className="border boreder-black-500 mt-4 p-1 w-fit self-center text-2xl">Create Board</button>
                </form>
            </div>
        </div>
    )
}