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
        "Build your own economy without relying on social media giants by turning your fans into investors",
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
        'Raise funds through token for startups or nonprofit causes and even create loyalty based engagement experience',
      icon: enterprise,
    },
  ]

export default function Home() {
  return (
      <>
{/* Use Cases  */}

    <div className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-10xl leading-8 font-extrabold tracking-tight text-indigo-150 sm:text-4xl"> Sikka </p>
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