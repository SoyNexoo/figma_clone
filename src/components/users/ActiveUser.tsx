import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avatar";

const ActiveUser = () =>  {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <main className="flex h-screen w-full select-none place-content-center place-items-center">
      <div className="flex pl-3">
        {users.slice(0, 3).map(({ connectionId, info }:any) => {
          return (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          );
        })}

        {hasMoreUsers && <div className={'more'}>+{users.length - 3}</div>}

        {currentUser && (
          <div className="relative ml-8 first:ml-0">
            <Avatar src={(currentUser.info as {avatar:string}).avatar} name="You" />
          </div>
        )}
      </div>
    </main>
  );
}

export default ActiveUser