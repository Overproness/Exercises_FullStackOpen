import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AdditionForm from './AdditionForm'
import userEvent  from '@testing-library/user-event'

describe('checking the blog addition form',() => {

  test('to check the blog addition form', async () => {
    const createBlog = jest.fn()

    const component = render(<AdditionForm createBlog={createBlog} />)

    const user = userEvent.setup()

    const titleInput = component.container.querySelector('#title-input')
    const authorInput = component.container.querySelector('#author-input')
    const urlInput = component.container.querySelector('#url-input')
    const saveButton = screen.getByText('Submit')
    await user.type(titleInput, 'title')
    await user.type(authorInput, 'author')
    await user.type(urlInput, 'url')
    await user.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title')
  })
})