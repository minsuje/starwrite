import { ListViewMainEnt } from '../../entities/ListView';

function ListViewContentWid({ selected }: { selected: string }) {
  return <ListViewMainEnt category={selected} />;
}

export default ListViewContentWid;
