import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('checking the rendering of the blogs', () => {
  const blog = {
    title: 'Goto Statement is considered harmful',
    author: 'FullStackOpen',
    url: 'www.example.com',
    likes: 27,
    user: {
      username: 'FullStackOpen'
    }
  }

  const user ={
    username: 'FullStackOpen'
  }
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} likesUpdater={mockHandler} />)
  })

  test('title and author are rendered but url and likes are not when contracted',() => {


    const titleElement = screen.getByText('Goto Statement is considered harmful')
    expect(titleElement).toBeDefined()
    const userElement = screen.getByText('FullStackOpen')
    expect(userElement).toBeDefined()

    const details = component.container.querySelector('#blog-details')
    expect(details).toHaveTextContent('')
  })


  test('title and author are rendered as are url and likes when expanded', () => {

    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const titleElement = screen.getByText('Goto Statement is considered harmful')
    expect(titleElement).toBeDefined()
    const userElement = screen.getByText('FullStackOpen')
    expect(userElement).toBeDefined()
    const details = component.container.querySelector('#blog-details')
    expect(details).toBeDefined()
  })


  test('if like clicked twice, its handler is received twice', async () => {

    const showButton = component.container.querySelector('button')
    fireEvent.click(showButton)

    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})