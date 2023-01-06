import { render,screen } from "@testing-library/react";
import {describe ,it} from'vitest'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
    },
});
test('full app rendering/navigating', async () => {
    render(
        <QueryClientProvider client={queryClient}>
                <App />
        </QueryClientProvider>
    , { wrapper: BrowserRouter })
    const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText('HOMEPAGE')).toBeInTheDocument()

    // verify page content for expected route after navigating
    await user.click(screen.getByText(/test/i))
    expect(screen.getByText(/test page/i)).toBeInTheDocument()
})
