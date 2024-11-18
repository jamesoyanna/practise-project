import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface SwiperProps {
    items: JSX.Element[]
    spaceBetween?: number // Added prop for spacing between slides
}

const Swiper: React.FC<SwiperProps> = ({ items, spaceBetween = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        )
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        )
    }

    const currentPage = currentIndex + 1
    const totalPages = items.length

    return (
        <div className="relative">
            <div className="flex overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        width: `calc(${items.length * 100}% - ${spaceBetween * (items.length - 1)}px)`, 
                        transform: `translateX(calc(-${currentIndex * (100 + spaceBetween)}% - ${currentIndex * spaceBetween}px))`,
                    }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-full" style={{ marginRight: spaceBetween ? `${spaceBetween}px` : 0 }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute left-0 right-0 flex justify-between mt-12">
                <button
                    className="px-4 py-2 bg-gray-200 rounded-md text-gray-800"
                    disabled={currentIndex === 0}
                    onClick={goToPrevious}
                >
                    <MdChevronLeft />
                </button>
                <span className="text-gray-800">
                    Asset {currentPage} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded-md text-gray-800"
                    disabled={currentIndex === items.length - 1}
                    onClick={goToNext}
                >
                    <MdChevronRight />
                </button>
            </div>
        </div>
    )
}

export default Swiper
