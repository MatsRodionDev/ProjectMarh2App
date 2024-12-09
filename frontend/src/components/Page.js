import { Pagination } from "react-bootstrap"

const Page = ({pagesCount, pageNumber, handlePageClick}) => {
    const pages = []

    for(let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    }

    return (
    <Pagination>
        {
            pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={pageNumber === page}
                    onClick={() => handlePageClick(page)}>
                        {page}
                </Pagination.Item>
            )
        }
    </Pagination>)
}

export default Page