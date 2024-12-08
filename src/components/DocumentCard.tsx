import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Document {
  title: string;
  authors: string[];
  abstract: string;
  keywords?: string[];
  source: 'arxiv' | 'pubmed' | 'scholar' | 'manual';
  url?: string;
}

export const DocumentCard = ({ document }: { document: Document }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{document.title}</CardTitle>
            <CardDescription>
              {document.authors.join(", ")}
            </CardDescription>
          </div>
          <span className="text-xs uppercase text-muted-foreground">
            {document.source}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{document.abstract}</p>
        {document.keywords && document.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {document.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs bg-secondary px-2 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        {document.url && (
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            View source
          </a>
        )}
      </CardContent>
    </Card>
  );
};