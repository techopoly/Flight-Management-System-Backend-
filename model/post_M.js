const { post, use } = require('../routes/post');
const db = require('../util/database');


class Post {
    constructor(post_content, username, image, vote) {
        this.post_content = post_content;
        this.username = username;
        this.image = image;
        this.vote = vote;
        this.id = 0;
    }



    static getPosts = async () => {

        try {
            const result = await db.execute('SELECT * FROM posts');
            console.log(result[0]);
            return result[0];
        } catch (err) {
            console.log(err)
        }
    }


    static findById = async (id) => {

        const result = await db.execute('SELECT * FROM posts WHERE posts.id = ?', [id])
        console.log(result[0]);
        return result[0];
    }

    createPost = async () => {

        try {
            const result = await db.execute(
                'INSERT INTO posts (post_content, username, image, vote) VALUES(?,?,?,?)',
                [this.post_content, this.username, this.image, this.vote]
            );
            console.log(result[0]);
            this.id = result[0].insertId;
            console.log(this)

            return {
                result: result[0],
                post: this
            }
        } catch (err) {
            console.log(err)
        }
    }

    static editPost = async (id, post_content, username, image, vote) => {

        const result = await db.execute(
            `UPDATE posts SET post_content=?, username=?, image=?, vote=? WHERE id=?`,
            [post_content, username, image, vote, id]

        );
       
        console.log(result[0]);
        result[0].id = id;
        return result[0];

    }

    static deletePost = async (id) =>{

        const result = await db.execute(
            `DELETE FROM posts WHERE id=${id}`        
        );

        return result[0];
       

        //`DELETE FROM todos WHERE id = ?`
    }


}

//`UPDATE posts SET post_content=?, username=?, image=?, vote=? WHERE id=${id}`
// `UPDATE posts SET post_content=${post_content}, username=${username}, image=${image}, vote=${vote} WHERE id=${id}`


//INSERT INTO `newsfeed`.`posts` (`post_content`, `username`, `image`, `vote`) VALUES ('dummy3', 'md', 'img3', '3');
//UPDATE `newsfeed`.`posts` SET `post_content` = 'dummy4', `username` = 'Mdd', `image` = 'img3333', `vote` = '4' WHERE (`id` = '6');

exports.Post = Post;