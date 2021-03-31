const { expect } = require('chai')
const request = require('supertest')

describe('Post Endpoints', () => {
  //uncomment to clear db
  // it('Truncrates database for testing', async () => {
  //   const res = await request('http://localhost:3000')
  //   .get('/users')
  //   const lastId = res.body.length - 1;
  //   for (var i = 0; i <= res.body[lastId].id + 1; i++){
  //     await request('http://localhost:3000').delete(`/users/${i}`)
  //   }
  // })
  it('POST should create a new post', async () => {
    const user = {
      //id: 1,//automatically assigned
      owner: 'jason',
      petNames: {pet:["Pet1", "Pet2", "Pet3"]}
    }
    const res = await request('http://localhost:3000')
      .post('/users')
      .send(user)
    expect(res.statusCode).equal(201)
    expect(res.body.owner).equal('jason')
    expect(res.body.petNames.pet[0]).equal("Pet1")
    expect(res.body.petNames.pet[1]).equal("Pet2")
    expect(res.body.petNames.pet[2]).equal("Pet3")
  })
  it('GET should get table', async () => {
    const res = await request('http://localhost:3000')
      .get('/users')
      expect(res.body[0].owner).contain('jason')
  })
  it('PUT should update user at specified id', async () => {
    const res = await request('http://localhost:3000')
      .put('/users/1')
      .send({
        owner: 'Jimmy',
        petNames: {pet:["Pet3", "Pet1", "Pet2"]}
      })
      expect(res.statusCode).equal(200)
      expect(res.body.owner).equal('Jimmy')
      expect(res.body.petNames.pet[0]).equal("Pet3")
      expect(res.body.petNames.pet[1]).equal("Pet1")
      expect(res.body.petNames.pet[2]).equal("Pet2")
  })
  it('DELETE should delete first user', async () => {
    const res = await request('http://localhost:3000')
    .get('/users')
    const lastId = res.body[0].id;
    const res2 = await request('http://localhost:3000')
    .del(`/users/${lastId}`)
    expect(res2.statusCode).equal(200)
    expect(res2.body).contain([])
  })
})