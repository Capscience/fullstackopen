import CommentForm from "../components/CommentForm";

const BlogComments = ({ blog }) => {
  return (
    <>
      <h3>Comments</h3>
      <CommentForm blog={blog} />
      {blog.comments.length !== 0 && (
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default BlogComments;
