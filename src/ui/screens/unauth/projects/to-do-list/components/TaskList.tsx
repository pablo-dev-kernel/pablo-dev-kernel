import { FC, useState } from "react";
// Types
import { TaskProps } from "../types/task.types";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";

interface ItemProps {
  data: (TaskProps & { options: React.ReactNode[] });
  index: number;
}

const ItemList: FC<ItemProps> = ({ data, index }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const { UI_COLORS } = useThemeController();

  return (
    <li className={`${UI_COLORS.card} p-2 rounded-xl cursor-pointer space-y-2`}>
      <p onClick={toggleShowMore}>
        {index}. {data.name} {data.status && <span className="text-green-500 font-bold "> FINALIZADA</span>}
      </p>

      {showMore &&
        <div className="flex gap-4">
          {data.options.map((value, index) =>
            <span key={index}>{value}</span>
          )}
        </div>
      }
    </li>
  );
};

interface TaskListProps {
  list: (TaskProps & { options: React.ReactNode[] })[];
}

const TaskList: FC<TaskListProps> = ({ list }) => {
  return (
    <ul className="grid gap-4">
      {list.map((item, index) =>
        <ItemList key={item.id} data={item} index={index + 1} />
      )}
    </ul>
  );
};

export { TaskList };
