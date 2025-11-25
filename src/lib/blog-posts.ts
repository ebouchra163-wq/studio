export const posts = [
  {
    id: 1,
    slug: 'tendencias-logisticas-2024',
    title: '5 Tendències Logístiques a Tenir en Compte el 2024',
    date: '2024-08-01T10:00:00.000Z',
    excerpt:
      "La indústria logística evoluciona ràpidament. Des de l'automatització fins a la sostenibilitat, explorem les tendències clau que marcaran el 2024 i més enllà.",
    content: `
        <p>La indústria logística es troba en un estat de canvi constant, impulsada pels avenços tecnològics, les expectatives canviants dels consumidors i un enfocament creixent en la sostenibilitat. A mesura que ens endinsem en el 2024, diverses tendències clau estan preparades per remodelar el panorama logístic.</p>
        
        <h3>1. Automatització i Robòtica</h3>
        <p>L'automatització ja no és una cosa del futur; és aquí. Els magatzems estan adoptant cada cop més sistemes automatitzats de classificació, vehicles de guiatge automàtic (AGV) i drons per a la gestió d'inventaris. Aquestes tecnologies augmenten l'eficiència, redueixen els errors humans i acceleren el compliment de les comandes.</p>

        <h3>2. Sostenibilitat a la Cadena de Subministrament</h3>
        <p>Les pràctiques ecològiques són ara una prioritat. Les empreses estan invertint en vehicles elèctrics, optimitzant rutes per reduir les emissions i adoptant embalatges sostenibles. Una cadena de subministrament verda no només és bona per al planeta, sinó que també atrau els consumidors conscients del medi ambient.</p>

        <h3>3. Presa de Decisions Basada en Dades</h3>
        <p>El Big Data i l'anàlisi estan revolucionant la gestió logística. Mitjançant l'anàlisi de grans conjunts de dades, les empreses poden preveure la demanda, optimitzar els nivells d'inventari i identificar possibles interrupcions abans que es produeixin, la qual cosa condueix a operacions més resilients i eficients.</p>

        <h3>4. L'auge de la Logística de l'Última Milla</h3>
        <p>Amb l'explosió del comerç electrònic, l'última milla del lliurament s'ha convertit en un camp de batalla crític. Les empreses estan experimentant amb solucions innovadores com el crowdsourcing de lliuraments, els punts de recollida i els armariets autònoms per oferir lliuraments més ràpids i flexibles.</p>

        <h3>5. Digitalització i Visibilitat en Temps Real</h3>
        <p>La tecnologia Blockchain i els sensors IoT estan proporcionant una visibilitat sense precedents a tota la cadena de subministrament. Els expedidors poden seguir els seus productes en temps real, supervisar les condicions (com la temperatura) i garantir l'autenticitat i la seguretat dels seus béns.</p>

        <p>Adoptar aquestes tendències serà crucial per a les empreses de logística que busquen mantenir-se competitives en un mercat dinàmic.</p>
      `,
    imageId: 'blog-post-1',
  },
  {
    id: 2,
    slug: 'importancia-logistica-inversa',
    title: 'La Importància Creixent de la Logística Inversa',
    date: '2024-07-25T14:30:00.000Z',
    excerpt:
      'La logística inversa, la gestió de les devolucions i el reciclatge, ja no és una idea tardana. Descobreix per què un procés de logística inversa eficient és vital per a la satisfacció del client i la sostenibilitat.',
    content: `
        <p>Tradicionalment, la logística s'ha centrat en el moviment cap endavant dels productes des del fabricant fins al consumidor. No obstant això, el flux invers de béns —conegut com a logística inversa— està guanyant una importància immensa en el panorama actual del comerç electrònic.</p>
        
        <h3>Què és la Logística Inversa?</h3>
        <p>La logística inversa es refereix a tots els processos implicats en la devolució de productes d'un client a un venedor o fabricant. Això inclou les devolucions de clients, la reparació i manteniment, el reembalatge per a la revenda, el reciclatge i l'eliminació adequada.</p>

        <h3>Per què és tan important?</h3>
        <p><strong>1. Satisfacció del Client:</strong> Un procés de devolució fàcil i sense problemes és un motor clau de la fidelitat del client. Els compradors en línia són més propensos a comprar a un minorista que ofereix devolucions senzilles.</p>
        <p><strong>2. Impacte Financer:</strong> Una gestió eficient de les devolucions pot recuperar un valor significatiu dels béns retornats. Els productes es poden restaurar, reempaquetar i revendre, convertint una pèrdua potencial en un guany.</p>
        <p><strong>3. Sostenibilitat:</strong> Una logística inversa eficaç és un component central de l'economia circular. En lloc d'acabar en abocadors, els productes poden ser reparats, reutilitzats o reciclats, minimitzant els residus i l'impacte ambiental.</p>

        <h3>Reptes de la Logística Inversa</h3>
        <p>Gestionar el flux invers presenta reptes únics. Els volums són imprevisibles, la qualitat dels productes retornats varia, i la logística pot ser més complexa i costosa que la logística d'avançada. No obstant això, invertir en un sistema de logística inversa robust ja no és opcional; és essencial per a l'èxit a llarg termini.</p>
      `,
    imageId: 'blog-post-2',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
