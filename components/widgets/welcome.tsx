import { HiOutlineSpeakerWave } from "react-icons/hi2"

export default function Welcome({ children }: any): JSX.Element {
      return (
            <div className='
                  w-full my-2 mx-4 rounded-md
                  bg-zinc-100 dark:bg-zinc-500
                  shadow-lg shadow-indigo-500/50 dark:shadow-cyan-500/50
                  text-sm
            '>
                  <span className="py-1 flex">
                        <span className="mx-3 items-center justify-center text-lg pt-0.5">
                              <HiOutlineSpeakerWave />
                        </span>
                        {children}
                  </span>
            </div>
      )
}