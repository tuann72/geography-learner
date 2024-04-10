import * as React from 'react';

export default function Page() {
    return (
    <div className="bg-white flex flex-col h-screen justify-center items-center">
        <div className="h-1/2 flex flex-col justify-center items-center">
            <h1 className="text-3xl text-black">Geography Learner</h1>
            <h2 className="text-black">Select a learning game below!</h2>
        </div>
        <div className="grid grid-cols-2 w-2/3 h-1/2 gap-10">
            <button className="h-1/2 bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded">Button</button>
            <button className="h-1/2 bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded">Button</button>
        </div>
    </div>
    )
}