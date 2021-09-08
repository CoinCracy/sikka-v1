/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import "../../build/tailwind.css"


// Use Case Icons 
import individual from './images/individual.png'
import creator from './images/creator.png'
import community from './images/community.png'
import enterprise from './images/building.png'


const features = [
    {
      name: 'Competitive exchange rates',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: GlobeAltIcon,
    },
    {
      name: 'No hidden fees',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: ScaleIcon,
    },
    {
      name: 'Transfers are instant',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: LightningBoltIcon,
    },
    {
      name: 'Mobile notifications',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: AnnotationIcon,
    },
  ]

const uses = [
    {
      name: 'Creator',
      description:
        "Build your own economy without relying on social media gaints by turning your fans into investors",
      icon: creator,
    },
    {
      name: 'Community',
      description:
        'Initiate Fancoins for your favourite creator and get bragging rights and profit once the creator gets on the platform ',
      icon: community,
    },
    {
      name: 'Individual',
      description:
        'Tokenize yourself with informational collateral to fund anything from your dream project to higher studies ',
      icon: individual,
    },
    {
      name: 'Enterprise',
      description:
        'Raise funds through token for startups or nonprofit causes and even create loyalty based engagement experince',
      icon: enterprise,
    },
  ]

export default function Home() {
  return (
      <>

    {/* Introduction  */}
    <div className="relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >  
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-white xl:inline">Democratizing Fungibility</span>

              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            By bringing the infrastructure at one place, Sikka aims to democratize the token economy by making it accessible to anyone.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" className="w-full flex items-center justify-center border border-transparent text-base font-medium rounded-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      </div>
    </div> 






{/* Dex */}
<div className="relative bg-white overflow-hidden">
  <div className="max-w-7xl mt-32 mb-32 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to send money
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
              accusamus quisquam.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
</div>

{/* Use Cases  */}

    <div className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-indigo-100 sm:text-4xl">
          Create and Trade Your Cryptocurrency under a Minute
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
           We built sikka for everyone and anything. The only limitation it has is your imagination.
          </p>
        </div>



        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {uses.map((feature) => (
              <div key={feature.name} className="relative bg-white shadow-lg p-14 rounded-lg">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                    <img  src={feature.icon} style={{height : "100px" , width : "150px" , maxWidth : "none"} } className=" mt-20 ml-2" aria-hidden="true" />
                  </div>
                  <p className="ml-32 text-xl leading-6 font-bold font-large text-blue-500">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-32 text-base text-black">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </>
  )
}