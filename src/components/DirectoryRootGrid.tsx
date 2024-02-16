import { Link } from "@yext/pages-components";
import { DirectoryChild } from "../types/DirectoryChild";
import { DirectoryParent } from "../types/DirectoryParent";

interface DirectoryRootProps {
  name?: string;
  description?: string;
  directoryChildren?: any;
  relativePrefixToRoot?: string;
}

const sortChildrenByName = (
  a: DirectoryChild | DirectoryParent,
  b: DirectoryChild | DirectoryParent
) => {
  // First, compare by meta.entityType.id
  if (a.meta.entityType.id !== b.meta.entityType.id) {
    return a.meta.entityType.id < b.meta.entityType.id ? -1 : 1;
  } else {
    // If meta.entityType.id values are equal, compare by name
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }
};

const DirectoryRootGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryRootProps) => {
  const sortedChildren = directoryChildren?.sort(sortChildrenByName) || [];
  const childrenDivs = sortedChildren.map((child: DirectoryChild) => (
    <div key={child.slug}>
      <Link
        href={relativePrefixToRoot + child.slug}
        className="font-bold text-2xl text-blue-700 hover:underline"
      >
        {child.c_addressRegionDisplayName
          ? child.c_addressRegionDisplayName
          : child.name}{" "}
        ({child.dm_childEntityIds?.length || 0}) - <span className="italic font-normal">{child.meta.entityType.id === "ce_city" ? "City" : child.meta.entityType.id === "ce_state" ? "State/Province" : child.meta.entityType.id}</span>
      </Link>
    </div>
  ));
  return (
    <>
      <div className="section space-y-14 px-10">
        <div className="space-y-6">
          {name && (
            <h1 className="text-3xl font-semibold text-center">{name}</h1>
          )}
          {description && <p className="text-2xl text-center">{description}</p>}
        </div>
        {directoryChildren && (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {childrenDivs}
          </div>
        )}
      </div>
    </>
  );
};

export default DirectoryRootGrid;
