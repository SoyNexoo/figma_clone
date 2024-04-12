import { generateRandomName } from "@/lib/utils";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avatar";
import { useMemo } from "react";

const ActiveUser = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoizedUser = useMemo(() => (
    <main className="flex items-center justify-center gap-1 py-2">
      <div className="flex pl-3">
        {currentUser && (
          <div className="relative ml-8 first:ml-0">
            <Avatar otherStyles={'border-[3px] border-primary-green'} name="You" />
          </div>
        )}
        {users.slice(0, 3).map(({ connectionId }: any) => {
          return (
            <Avatar key={connectionId} name={generateRandomName()} otherStyles='-ml-3' />
          );
        })}

        {hasMoreUsers && <div className={'more'}>+{users.length - 3}</div>}


      </div>
    </main>
  ), [users.length])

  return memoizedUser
}

export default ActiveUser