import { render,screen } from "@testing-library/react";
import {describe ,it} from'vitest'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import App from './App'

test('full app rendering/navigating', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText(/HOMEPAGE/i)).toBeInTheDocument()

    // verify page content for expected route after navigating
    await user.click(screen.getByText(/test/i))
    expect(screen.getByText(/test page/i)).toBeInTheDocument()
})
