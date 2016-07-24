import faker from 'faker';
import mongoose from 'mongoose';
import S from 'string';

const { ObjectId } = mongoose.Types;

const randInt = (from, to) => parseInt((Math.random())*(to-from)+from);

const sirTrevorHeader = (text) => ({type: 'heading', data: {text, format: 'html'}});
const sirTrevorText = (text) => ({type: 'text', data: {text, format: 'html'}});
const sirTrevorImage = (url) => ({type: 'image', data: {file: {url}}});

faker.locale = "nb_NO";

export default programId => {
  const title = faker.fake('{{lorem.words}}');
  const slug = S(title).slugify().s;
  const publishAt = new Date(faker.fake('{{date.past}}'));
  const createdBy = faker.fake('{{name.findName}}');
  const program = new ObjectId(programId);
  const lead = faker.fake('{{lorem.paragraph}}');
  const image = faker.fake('{{image.cats}}');

  const body = [];

  // A header
  body.push(sirTrevorHeader(title));

  // Some paragraphs
  for (let i = 0; i < randInt(1,3); i++) {
    body.push(sirTrevorText(faker.fake('{{lorem.paragraph}}')));
  }

  // An image
  body.push(sirTrevorImage(faker.fake('{{image.cats}}')));

  // Some more paragraphs
  for (let i = 0; i < randInt(1,5); i++) {
    body.push(sirTrevorText(faker.fake('{{lorem.paragraph}}')));
  }

  return {
    title,
    slug,
    publishAt,
    createdBy,
    program,
    image,
    lead,
    body: JSON.stringify(body)
  };
};
