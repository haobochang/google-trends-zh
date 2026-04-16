import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import { sampleTrends } from './data/sampleTrends'

describe('App routes', () => {
  it('renders the home page with trending cards', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App trends={sampleTrends} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /google 热搜中文站/i })).toBeInTheDocument()
    expect(screen.getByText('Allbirds')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /查看详情/i }).length).toBeGreaterThan(0)
  })

  it('renders the detail page for a specific trend', () => {
    render(
      <MemoryRouter initialEntries={['/trend/allbirds']}>
        <App trends={sampleTrends} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Allbirds' })).toBeInTheDocument()
    expect(screen.getByText(/卖鞋公司做 ai/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /返回今日榜单/i })).toBeInTheDocument()
  })
})
