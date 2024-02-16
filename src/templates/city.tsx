import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import PageLayout from "../components/PageLayout";
import Breadcrumbs from "../components/Breadcrumbs";


export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    filter: {
      savedFilterIds: [YEXT_PUBLIC_CITY_SFID],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_addressRegionDisplayName",
      "dm_directoryParents_soccer_stadiums_full.name",
      "dm_directoryParents_soccer_stadiums_full.slug",
      "dm_directoryParents_soccer_stadiums_full.meta",
      "dm_directoryParents_soccer_stadiums_full.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.photoGallery",
    ],
    localization: {
      locales: ["en", "es"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents_soccer_stadiums_full, name } = data.document;

  (dm_directoryParents_soccer_stadiums_full || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents_soccer_stadiums_full: dm_directoryParents_soccer_stadiums_full,
    },
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const { name, description, dm_directoryParents_soccer_stadiums_full, dm_directoryChildren } =
    document;

  return (
    <>
      <PageLayout templateData={{__meta, document}}>
        <Banner />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents_soccer_stadiums_full}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryCityGrid
            name={name}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default City;
