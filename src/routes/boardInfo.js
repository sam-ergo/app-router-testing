import { useLoaderData, Link } from "react-router-dom";

// export const boardLoader = async () => {
//     const res = await fetch(`http://localhost:3000/api/board/all`);
    
//     return res.json();
// }

export default function BoardInfo() {
    const board = useLoaderData();

    // if (board.error === true) {
    //     console.log("hello")
    //     throw new Response("", {
    //       status: 404,
    //       statusText: "Twaticus",
    //     });
    // }

    console.log(board)
    return (
        <>
            {board.board_data.map(boards => (
               <Link to="/" key={boards.id}>
                <p>{boards.id}</p>
               </Link> 
            ))}
            <p>Board Info</p>
        </>
    )
}