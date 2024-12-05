import React from 'react'

function Hero() {
  return (
    <section className="bg-black h-screen">
        <div>
            <h2>see more</h2>
        </div>

  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-300">
        Documents & diagrams
        <strong className="font-extrabold text-red-700 sm:block"> for engineering teams </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-slate-200">
        All-in-one markdown editor, collaborative canvas, and diagram-as-code-builder
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>

        
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero


