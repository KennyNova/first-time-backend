const request = require('supertest')
const app = require('../index')
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = require('chai');
// chai.use(chaiHttp);

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request('http://localhost:3000')
      .post('/users')
      .send({
        id: 1,
        owner: 'jason',
        petNames: {pet:["Pet1", "Pet2", "Pet3"]}
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })
  it('should get table', async () => {
      const res = await request('http://localhost:3000')
      .get('/users')
      expect(res.body).toHaveProperty('get')
  })
})