interface PropsType {
  title: string;
  item: string | number;

  localization: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
  };
}

const updateLink = ({ title, localization, item }: PropsType) => {
  const updatedSearchParams = new URLSearchParams(localization.search);
  updatedSearchParams.set(title, item.toString());

  return `?${updatedSearchParams.toString()}`;
};

export default updateLink;
