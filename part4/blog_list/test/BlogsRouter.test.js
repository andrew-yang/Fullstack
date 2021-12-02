const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/Blog')

const api = supertest(app)

const initialBlogs = [
  {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
  },
  {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
  },
]


beforeEach(async () => {
    await Blog.deleteMany({})
    
    const promises = initialBlogs
    .map(blog => new Blog(blog))
    .map(blog => blog.save())

    await Promise.all(promises)
  })

describe("Get Tests", () => {
  test('Two Blogs are Returned', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(2)
  })
    
  test('ID field is named correctly', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach( entry => {
      console.log(entry)
      expect(entry.id).toBeDefined()
    })
  })
})

describe("POST tests", () => {
  test('If Like is omitted, it will be defaulted to 0 in the DB', async () => {

    const newBlog =   {
      title: "Likes Test",
      author: "Test Authorr",
      url: "www.test.com",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })

  test('If Title or URL are omitted, backend response with 400', async () => {

    const missingTitleBlog = {
      author: "Test Author",
      url: "www.test.com",
    }

    const responseMissingTitle = await api
      .post('/api/blogs')
      .send(missingTitleBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const missingUrlBlog = {
      title: "Likes Test",
      author: "Test Authorr",
    }

    const responseMissingUrl = await api
      .post('/api/blogs')
      .send(missingUrlBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })
})

afterAll(() => {
    mongoose.connection.close()
})
