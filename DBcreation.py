from app import db
db.create_all()

from app import Task
Water = Task('Постройте молекулу воды', '[O]')
SulfuricAcid = Task('Постройте молекулу серной кислоты', '[O][S]=[O]=[O][O]') # TODO [O][S](=O)(=O)[O]

db.session.add(Water)
db.session.add(SulfuricAcid)

db.session.commit()
