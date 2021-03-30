const { expect } = require('chai')
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
        //id: 1,
        owner: 'jason',
        petNames: {pet:["Pet1", "Pet2", "Pet3"]}
      })
    expect(res.statusCode).equal(201)
    //expect(res.body).toContain('hi')
  })
  it('should get table', async () => {
    const res = await request('http://localhost:3000')
      .get('/users')
      expect(res.body[1].owner).contain('jason' && '"Pet1", "Pet2", "Pet3"')
  })
  it('should update user at specified id', async () => {
    const res = await request('http://localhost:3000')
      .get('/users')
      expect(res.body[1]).contain('jason' && '"Pet1", "Pet2", "Pet3"')
      .put('/users/1')
      .send({
        owner: 'Jimmy',
        petNames: {pet:["Pet3", "Pet1", "Pet2"]}
      })
      expect(res.statusCode).equal(200)
      expect(res.body[1]).contain('Jimmy' && '"Pet3", "Pet1", "Pet2"')
  })
})