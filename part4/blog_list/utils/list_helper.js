    const dummy = (blogs) => {
        return 1
    }
  
    const totalLikes = (blogs) => {
        return blogs.reduce((sum, current) => sum + current.likes, 0)
    }

    const favoriteBlog = (blogs) => {
        let {_id, __v, url, ...theRest} = blogs.reduce((mostThusFar, current) => mostThusFar.likes <= current.likes ? current : mostThusFar, {likes:0})
        return theRest
    }
    
    const mostBlogs = (blogs) => {
        let results = { most: {author: "", count: 0}, totals: new Map()}

        const reduceFunction = (result, current) => {
            console.log(result.totals)
            let currentCount = result.totals.get(current.author)
            let newCount = !currentCount ? 1 : currentCount + 1;

            //update totals
            result.totals.set(current.author, newCount)

            if (result.most.author === ""){
                result.most.author = current.author
                result.most.count = 1
            } else if(result.most.author !== current.author && 
                result.most.count < newCount){
                result.most.author = current.author
                result.most.count = newCount
            } else if(result.most.author === current.author){
                result.most.count = newCount
            }
            
            return result
        }

        blogs.reduce(reduceFunction , results)
        
        return {author: results.most.author, blogs: results.most.count }
    }

    const mostLikes = (blogs) => {
        let results = { most: {author: "", likes: 0}, totals: new Map()}
        
        const reduceFunction = (result, current) => {
            
            let currentLikes = result.totals.get(current.author)
            let newLikes = !currentLikes ? current.likes : currentLikes+current.likes;

            //update totals
            result.totals.set(current.author, newLikes)

            //Update Most entry
            if (result.most.author === ""){
                //initialize
                result.most.author = current.author
                result.most.likes = newLikes
            } else if(result.most.author !== current.author && 
                    result.most.likes < newLikes){
                
                //different Author with more likes
                result.most.author = current.author
                result.most.likes = newLikes

            } else if(result.most.author === current.author){
                
                //Existing author got more likes
                result.most.likes = newLikes
            }
            return result
        }

        blogs.reduce(reduceFunction , results)
        
        return {author: results.most.author, likes: results.most.likes }
    }

    module.exports = {
        dummy,
        totalLikes,
        favoriteBlog,
        mostBlogs,
        mostLikes,
    }