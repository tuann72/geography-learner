const checkEntry = (entry: string, correct: string) => {
    
    if(entry.toLowerCase() === correct.toLowerCase()){
        return true;
    }

    return false;
}

export default checkEntry